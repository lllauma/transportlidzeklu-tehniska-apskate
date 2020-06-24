# Pārbaudes uzdevums

Izstrādāta vizuāla WEB lapa, kurā tiek parādīti transportlīdzekļi(TL), kas norīkoti tehniskās apskates(TA) laukumā, un to sadalījums pa līnijām.

Risinājums izstrādāts izmantojot Angular 9.

## Risinājuma apraksts
Dati tiek ielasīti no faila src/assets/db.json. Tā kā dati ir statiski, tie tiek ielādēti globālā masīvā, kurš var tikt rediģēts (transportlīdzekļi var tikt izņemti),
taču pats fails netiek mainīts, līdz ar to pēc lapas pārlādes dati būs to sākotnējā formā.

Failā src/assets/conf.json atrodama esošā konfigurācija 
    - datu faila atrašanās vieta
    - apskates laukuma parametri, lai risinājums būtu ērti pielāgojams