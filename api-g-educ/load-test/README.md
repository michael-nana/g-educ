# Test de charge mobile, parcours en lecture

Le Compose dédié démarre une API NestJS, PostgreSQL et un générateur de charge Node. Il utilise une base isolée du `docker-compose.yml` habituel. Le jeu de données crée un élève et des cours synthétiques sans fichiers PDF ou vidéo.

## Préparation

Ce test ne concerne qu’un environnement local. Il envoie seulement des requêtes GET pendant la charge; une connexion de test est créée avant le test et révoquée après. Ne réutilise pas ces identifiants ailleurs.

Depuis la racine du dépôt, démarre l’API isolée :

```powershell
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml up -d --build api
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml run --rm api npm run seed:load-test
Invoke-RestMethod http://localhost:3100/api/v1/classes
```

Le compte local par défaut est `+22670000001` / `LoadTest-Local-2026!`. Pour en choisir un autre, définir `LOAD_TEST_PHONE` et `LOAD_TEST_PASSWORD` avant le démarrage **et** le seed. Le générateur lit les mêmes variables.

Lance ensuite les paliers, toujours depuis la racine :

```powershell
$env:LOAD_TEST_VUS = '5'
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml --profile loadtest run --rm loadtest
$env:LOAD_TEST_VUS = '10'
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml --profile loadtest run --rm loadtest
$env:LOAD_TEST_VUS = '20'
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml --profile loadtest run --rm loadtest
```

Augmente ensuite à 40, 80, etc. Surveille `docker stats` et les journaux avec `docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml logs -f api`. Le script affiche le débit, les latences p50/p95/p99 et les codes HTTP. `RATE_LIMIT_MAX` vaut 10 000 dans ce stack local pour mesurer l’API et PostgreSQL sans que la limite normale de 30 requêtes/minute par IP fausse le résultat. Pour tester la limite, recrée l’API ainsi :

```powershell
$env:RATE_LIMIT_MAX = '30'
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml up -d --force-recreate api
Remove-Item Env:RATE_LIMIT_MAX
```

Ce scénario ne télécharge pas de PDF ni de vidéo. L’endpoint S3 est volontairement factice : aucune route de ce parcours de lecture ne contacte le stockage. Les dépôts MinIO `minio/minio` et `minio/mc` utilisés précédemment ne sont plus disponibles sur Docker Hub; pour tester le débit des médias, il faudra un stockage S3 de test séparé. Le générateur lui-même peut devenir le goulot d’étranglement : ne considère pas ses chiffres comme une capacité de production garantie.

Arrête et efface uniquement la base de ce stack de test :

```powershell
docker compose -p geduc-loadtest -f api-g-educ/docker-compose.loadtest.yml down -v
```
