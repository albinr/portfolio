---
Title: Load analysis
Description: Load analysis report.
---

Webbsidors prestanda
=======================

Denna rapport är en uppgift i design kursen på webbprogrammerings programmet och undersöker webbplatsers laddningstid och prestanda.

Urval
-----------------------

Urvalet av webbplatser är från samma bransch som är digital spelförsäljning. Jag tycker de passar bra för denna rapport för att de har många bilder och videor på deras webbplatser. Webbplattserna är https://store.steampowered.com/, https://store.epicgames.com/ och https://eu.shop.battle.net/en-us.

Jag har också valt att jämföra liknande sidor från de olika företagen. Som till exempel deras produktsidor och deras supportsidor.


Metod
-----------------------

För att mäta webbsidornas prestanda gör jag på detta sätt:

1. Tar en bild på webbplatsen.
2. Väljer ut tre sidor som skall mätas med Google Pagespeed. Jag mäter både Mobile och Desktop och sedan noterar jag de betyg som ges.
3. För varje sida mäter jag prestandan med devtools flik networks och noteraar sidans laddningstid tillsammans med antalet resurser som laddas samt sidans totala storlek. För varje sida görs mätningen tre gånger och sedan tas snittet av mätvärdena.
4. Resultaten läggs i ett google kalkylark.



Resultat
-----------------------
Här är resultatet av mätningarna.

<div class="embed-container">
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQiMAJBXJtkWPdLGbNHAzIU1Xi6F1tT9xDfXFQs10Y1qdLabA5YUyk78rqjcbYeVJRj0h8Mkqa17KGR/pubhtml?widget=true&amp;headers=false" title="spreadsheet with load times"></iframe>
</div>

<h3>Steam</h3>
<img src="%base_url%/image/steam.png" alt="Bild på Steams webbsida" style="max-width: 100%;"></img>

<h3>Epic Games</h3>
<img src="%base_url%/image/epicGames.png" alt="Bild på Epic Games webbsida" style="max-width: 100%;"></img>

<h3>Battle.net</h3>
<img src="%base_url%/image/battle-net.png" alt="Bild på Battle.nets webbsida" style="max-width: 100%;"></img>

Analys
-----------------------

Webbplatserna hade lägre prestanda än vad jag förväntade mig. Speciellt på mobil.

De mobila versionerna fick alltid sämre prestanda i Page Speed Insights än dator versionerna.

Första sidorna och produktsidorna ser väldigt lika ut och alla använder en bildkarusell på förstasidan som laddar in ny data.

Det var fyra olika förbättringsmöjligheter som uppkom och de var:
- Använd bilder med rätt storlek
- Ta bort resurser som blockerar renderingen
- Skicka bilder i modernare bildformat
- Reducera JavaScript som inte används

Steam sidornas laddnings tid kan förbättras mycket genom att använda modernare bild format på deras sidor för mobilen. Ungefär 10sek på första sidan och produktsidan.

För mitt urval av hemsidor så var de vanligaste förbättringsområdena ofta relaterade till bilder. Till exempel att använda rätt bildstorlek eller använda moderna format på bilderna.

Webbplatserna rangordnade efter prestanda
1. https://eu.battle.net/support/en/ 90 i prestanda på dator
2. https://store.steampowered.com/ 81 i prestanda på dator
3. https://store.steampowered.com/app/730/CounterStrike_2/ 70 i prestanda på dator
4. https://help.steampowered.com/en/ 64 i prestanda på dator


Skriven av Albin Ryberg