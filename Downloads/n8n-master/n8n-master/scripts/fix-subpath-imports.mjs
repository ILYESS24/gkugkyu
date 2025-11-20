#!/usr/bin/env node

/**
 * Script pour corriger tous les imports de sous-chemins invalides
 * Remplace @workflow-automation/design-system/* et @workflow-automation/chat/* 
 * par des imports valides depuis les points d'entrée principaux
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Packages avec leurs exports valides
const PACKAGE_EXPORTS = {
	'@workflow-automation/design-system': {
		main: 'src/index.ts',
		validSubpaths: ['style.css'], // Seul export valide de sous-chemin
	},
	'@workflow-automation/chat': {
		main: 'src/index.ts',
		validSubpaths: ['style.css'], // Seul export valide de sous-chemin
	},
};

// Mappings des imports de sous-chemins vers leurs exports depuis le point d'entrée
const SUBPATH_MAPPINGS = {
	// Design system
	'@workflow-automation/design-system/utils': '@workflow-automation/design-system',
	'@workflow-automation/design-system/components/N8nBreadcrumbs/Breadcrumbs.vue': '@workflow-automation/design-system',
	'@workflow-automation/design-system/components/N8nIcon/icons': '@workflow-automation/design-system',
	'@workflow-automation/design-system/src/components/N8nIcon/icons': '@workflow-automation/design-system',
	'@workflow-automation/design-system/src/css/index.scss': '../../@n8n/design-system/src/css/index.scss', // Chemin relatif pour SCSS
	
	// Chat
	'@workflow-automation/chat/utils': '@workflow-automation/chat',
	'@workflow-automation/chat/src/event-buses': '@workflow-automation/chat',
};

const FILE_EXTENSIONS = ['.ts', '.mts', '.vue'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.turbo', 'coverage'];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

function shouldIgnore(path) {
	const parts = path.split(/[/\\]/);
	return IGNORE_DIRS.some((dir) => parts.includes(dir));
}

function fixSubpathImports(content, filePath) {
	let modified = false;
	let replacements = 0;
	let newContent = content;

	// Remplacer tous les imports de sous-chemins connus
	for (const [subpath, replacement] of Object.entries(SUBPATH_MAPPINGS)) {
		// Pattern pour import/from avec le sous-chemin
		const patterns = [
			// import ... from '@workflow-automation/package/subpath'
			new RegExp(`(import\\s+[^'"]*from\\s+['"])${subpath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
			// import '@workflow-automation/package/subpath'
			new RegExp(`(import\\s+['"])${subpath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
			// require('@workflow-automation/package/subpath')
			new RegExp(`(require\\(['"])${subpath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"]\\))`, 'g'),
		];

		for (const pattern of patterns) {
			if (pattern.test(newContent)) {
				newContent = newContent.replace(pattern, `$1${replacement}$2`);
				modified = true;
				replacements++;
			}
		}
	}

	// Remplacer les autres imports de sous-chemins génériques (sauf ceux valides)
	for (const [pkg, config] of Object.entries(PACKAGE_EXPORTS)) {
		// Pattern pour détecter les imports de sous-chemins
		const subpathPattern = new RegExp(
			`(['"])${pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([^'"]+)(['"])`,
			'g',
		);

		newContent = newContent.replace(subpathPattern, (match, quote1, subpath, quote2) => {
			// Si c'est un export valide, on le garde
			if (config.validSubpaths.includes(subpath)) {
				return match;
			}

			// Sinon, on remplace par le point d'entrée principal
			modified = true;
			replacements++;
			return `${quote1}${pkg}${quote2}`;
		});
	}

	return { content: newContent, modified, replacements };
}

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
		// Ignorer les erreurs
	}
}

function processFile(filePath) {
	totalFiles++;

	try {
		const content = readFileSync(filePath, 'utf8');
		const { content: newContent, modified, replacements } = fixSubpathImports(content, filePath);

		if (modified) {
			writeFileSync(filePath, newContent, 'utf8');
			modifiedFiles++;
			totalReplacements += replacements;
			return true;
		}
	} catch (error) {
		console.error(`Erreur avec ${filePath}:`, error.message);
	}

	return false;
}

function main() {
	console.log('🔧 Correction de tous les imports de sous-chemins...\n');

	const startTime = Date.now();

	// Traiter seulement editor-ui, pas les packages eux-mêmes
	const editorUiDir = join(rootDir, 'packages', 'frontend', 'editor-ui', 'src');
	walkDirectory(editorUiDir, processFile);

	const duration = ((Date.now() - startTime) / 1000).toFixed(2);

	console.log('\n✅ Correction terminée!');
	console.log(`   Fichiers traités: ${totalFiles}`);
	console.log(`   Fichiers modifiés: ${modifiedFiles}`);
	console.log(`   Total de remplacements: ${totalReplacements}`);
	console.log(`   Durée: ${duration}s\n`);

	if (modifiedFiles > 0) {
		console.log('⚠️  Des fichiers ont été modifiés.\n');
		process.exit(0);
	} else {
		console.log('✨ Tous les imports sont déjà corrects!\n');
		process.exit(0);
	}
}

main();

