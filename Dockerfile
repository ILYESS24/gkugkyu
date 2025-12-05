# Dockerfile pour Flo AI API - Racine du repository
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copier d'abord le dossier parent pour éviter les problèmes de chemins avec espaces
COPY Downloads/ ./Downloads/

# Lister la structure pour debug (peut être supprimé après)
RUN ls -la Downloads/ && \
    find Downloads/ -name "requirements.txt" -type f | head -5

# Copier les fichiers de dépendances depuis le dossier copié (utiliser des guillemets pour les espaces)
RUN find Downloads/ -name "requirements.txt" -path "*/aurora_ai/*" | head -1 | xargs -I {} cp {} . && \
    pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application
RUN find Downloads/ -type d -name "aurora_ai" -path "*/flo-ai-develop/*" | head -1 | xargs -I {} cp -r {} ./aurora_ai/ && \
    find Downloads/ -name "api.py" -path "*/flo-ai-develop/*" | head -1 | xargs -I {} cp {} .

# Créer un utilisateur non-root
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Exposer le port
EXPOSE 8000

# Commande de démarrage
CMD ["python", "api.py"]

