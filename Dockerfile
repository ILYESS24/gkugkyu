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

# Lister la structure pour debug
RUN ls -la "Downloads/flo-ai-develop (2)/" && \
    find Downloads/ -name "requirements.txt" -type f | head -5 && \
    find Downloads/ -name "api.py" -type f | head -5

# Copier les fichiers de dépendances depuis le dossier copié
RUN REQ_FILE=$(find Downloads/ -name "requirements.txt" -path "*aurora_ai*" | head -1) && \
    if [ -n "$REQ_FILE" ]; then \
        cp "$REQ_FILE" . && \
        pip install --no-cache-dir -r requirements.txt; \
    else \
        echo "ERROR: requirements.txt not found" && \
        find Downloads/ -name "*.txt" | head -10 && \
        exit 1; \
    fi

# Copier le code de l'application
RUN AURORA_DIR=$(find Downloads/ -type d -name "aurora_ai" | head -1) && \
    API_FILE=$(find Downloads/ -name "api.py" | head -1) && \
    if [ -n "$AURORA_DIR" ]; then cp -r "$AURORA_DIR" ./aurora_ai/; fi && \
    if [ -n "$API_FILE" ]; then cp "$API_FILE" .; fi

# Créer un utilisateur non-root
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Exposer le port
EXPOSE 8000

# Commande de démarrage
CMD ["python", "api.py"]

