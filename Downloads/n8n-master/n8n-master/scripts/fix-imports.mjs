#!/usr/bin/env node

/**
 * Script pour corriger automatiquement tous les imports @n8n/ vers @workflow-automation/
 * S'exécute automatiquement avant le build pour garantir que tous les imports sont corrects
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Packages externes qui doivent rester @n8n/ (ne pas modifier)
const EXTERNAL_PACKAGES = [
	'@n8n/typeorm',
	'@n8n_io/ai-assistant-sdk',
	'@n8n_io/license-sdk',
	'@n8n/localtunnel',
	'@n8n/vm2',
	'@n8n/imap',
	'@n8n/client-oauth2',
	'@n8n/tournament',
];

// Extensions de fichiers à traiter
const FILE_EXTENSIONS = ['.ts', '.mts', '.js', '.mjs', '.cjs', '.vue', '.d.ts', '.d.mts', '.d.cts'];

// Dossiers à ignorer
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.turbo', 'coverage', '.next'];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

/**
 * Vérifie si un chemin doit être ignoré
 */
function shouldIgnore(path) {
	const parts = path.split(/[/\\]/);
	return IGNORE_DIRS.some((dir) => parts.includes(dir));
}

/**
 * Vérifie si un package est externe
 */
function isExternalPackage(text) {
	return EXTERNAL_PACKAGES.some((pkg) => text.includes(pkg));
}

/**
 * Corrige les imports dans le contenu d'un fichier
 */
function fixImports(content, filePath) {
	let modified = false;
	let replacements = 0;
	let newContent = content;

	// Étape 1: Protéger les packages externes avec des marqueurs temporaires
	const markers = new Map();
	EXTERNAL_PACKAGES.forEach((pkg, index) => {
		const marker = `__EXTERNAL_PKG_${index}__`;
		markers.set(marker, pkg);
		// Remplacer le package externe par le marqueur
		const escapedPkg = pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		newContent = newContent.replace(new RegExp(escapedPkg, 'g'), marker);
	});

	// Étape 2: Remplacer tous les @n8n/ restants par @workflow-automation/
	// MAIS ignorer:
	// - Les chemins relatifs (../@n8n/ ou ./@n8n/) car les dossiers physiques s'appellent toujours @n8n
	// - Les imports SCSS (@use/@import) qui référencent design-system car SASS ne peut pas résoudre @workflow-automation
	// On remplace ligne par ligne pour mieux détecter les chemins relatifs
	const lines = newContent.split('\n');
	let contentModified = false;
	const newLines = lines.map((line) => {
		// Si la ligne contient un chemin relatif avec @n8n/, on ne le modifie pas
		if (line.match(/['"]\.\.\/.*@n8n\//) || line.match(/['"]\.\/.*@n8n\//)) {
			return line;
		}
		// Si la ligne contient un import SCSS avec design-system, on ne le modifie pas
		// (SASS ne peut pas résoudre @workflow-automation, il faut @n8n pour les chemins de fichiers)
		if (line.match(/@use\s+['"]@n8n\/design-system/) || line.match(/@import\s+['"]@n8n\/design-system/)) {
			return line;
		}
		// Sinon, on remplace @n8n/ par @workflow-automation/
		if (line.includes('@n8n/')) {
			const newLine = line.replace(/@n8n\//g, '@workflow-automation/');
			if (newLine !== line) {
				contentModified = true;
				replacements++;
			}
			return newLine;
		}
		return line;
	});
	
	if (contentModified) {
		newContent = newLines.join('\n');
		modified = true;
	}

	// Étape 3: Restaurer les packages externes depuis les marqueurs
	markers.forEach((pkg, marker) => {
		newContent = newContent.replace(new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), pkg);
	});

	// Étape 4: Remplacer n8n-workflow par workflow-automation-workflow
	const workflowPattern = /(['"])(n8n-workflow)(['"])/g;
	if (workflowPattern.test(newContent)) {
		newContent = newContent.replace(workflowPattern, "$1workflow-automation-workflow$3");
		modified = true;
		replacements++;
	}

	// Étape 5: Remplacer n8n-core par workflow-automation-core
	const corePattern = /(['"])(n8n-core)(['"])/g;
	if (corePattern.test(newContent)) {
		newContent = newContent.replace(corePattern, "$1workflow-automation-core$3");
		modified = true;
		replacements++;
	}

	return { content: newContent, modified, replacements };
}

/**
 * Parcourt récursivement un répertoire
 */
function walkDirectory(dir, callback) {
	try {
		const entries = readdirSync(dir);

		for (const entry of entries) {
			const fullPath = join(dir, entry);

			if (shouldIgnore(fullPath)) {
				continue;
			}

			const stat = statSync(fullPath);

			if (stat.isDirectory()) {
				walkDirectory(fullPath, callback);
			} else if (stat.isFile()) {
				const ext = entry.substring(entry.lastIndexOf('.'));
				if (FILE_EXTENSIONS.includes(ext)) {
					callback(fullPath);
				}
			}
		}
	} catch (error) {
		// Ignorer les erreurs de lecture (permissions, etc.)
	}
}

/**
 * Traite un fichier
 */
function processFile(filePath) {
	totalFiles++;

	try {
		const content = readFileSync(filePath, 'utf8');
		const { content: newContent, modified, replacements } = fixImports(content, filePath);

		if (modified) {
			writeFileSync(filePath, newContent, 'utf8');
			modifiedFiles++;
			totalReplacements += replacements;
			return true;
		}
	} catch (error) {
		console.error(`Erreur lors du traitement de ${filePath}:`, error.message);
	}

	return false;
}

/**
 * Fonction principale
 */
function main() {
	console.log('🔧 Correction automatique des imports...\n');
	console.log(`Packages externes préservés: ${EXTERNAL_PACKAGES.join(', ')}\n`);

	const startTime = Date.now();

	// Parcourir tous les fichiers
	walkDirectory(rootDir, processFile);

	const duration = ((Date.now() - startTime) / 1000).toFixed(2);

	console.log('\n✅ Correction terminée!');
	console.log(`   Fichiers traités: ${totalFiles}`);
	console.log(`   Fichiers modifiés: ${modifiedFiles}`);
	console.log(`   Total de remplacements: ${totalReplacements}`);
	console.log(`   Durée: ${duration}s\n`);

	if (modifiedFiles > 0) {
		console.log('⚠️  Des fichiers ont été modifiés. Vérifiez les changements avant de commiter.\n');
		process.exit(0);
	} else {
		console.log('✨ Tous les imports sont déjà corrects!\n');
		process.exit(0);
	}
}

// Exécuter le script
main();

