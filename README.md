# Tablica Odjazdów Tramwajów - Gdańsk PKM Strzyża

Aplikacja webowa wyświetlająca w czasie rzeczywistym tablicę odjazdów tramwajów dla przystanków przy węźle przesiadkowym PKM Strzyża w Gdańsku. Została zaprojektowana, aby dostarczać pasażerom aktualne informacje w czystym, czytelnym i nowoczesnym interfejsie.

![Podgląd Aplikacji](https://github.com/SQ2MTG/ZTM-API-Tablica/blob/main/Przechwytywanie.PNG)
*(Uwaga: Powyższy obrazek jest przykładowy)*

## ✨ Kluczowe Funkcje

- **Dane w Czasie Rzeczywistym**: Wyświetla aktualne, szacowane czasy odjazdów tramwajów.
- **Widok Wielu Przystanków**: Monitoruje jednocześnie trzy kluczowe przystanki na węźle PKM Strzyża, obejmujące różne kierunki jazdy.
- **Automatyczne Odświeżanie**: Dane są automatycznie aktualizowane co 30 sekund, aby zapewnić ich bieżącą trafność.
- **Informacje o Opóźnieniach**: Wyraźnie oznacza opóźnione kursy i pokazuje czas opóźnienia, pomagając pasażerom w planowaniu podróży.
- **Nowoczesny i Responsywny Interfejs**: Ciemny motyw interfejsu jest przyjazny dla oczu i dostosowuje się do różnych rozmiarów ekranu, od urządzeń mobilnych po komputery stacjonarne.
- **Zegar Cyfrowy**: Duży, czytelny zegar w lewym górnym rogu zapewnia stały dostęp do aktualnego czasu.
- **Informacje o Pojazdach**: Wyświetla numer taborowy (kod pojazdu) dla każdego kursu.
- **Obsługa Błędów**: Informuje użytkownika, gdy nie można załadować danych dla danego przystanku.

## 🛠️ Stos Technologiczny

- **Frontend**: React, TypeScript
- **Stylizacja**: Tailwind CSS
- **Źródło Danych**: [Otwarty API ZTM Gdańsk (CKAN)](https://ckan.multimediagdansk.pl/)

## 📁 Struktura Projektu

Projekt ma przejrzystą strukturę, która oddziela poszczególne warstwy aplikacji, ułatwiając jej rozwój i utrzymanie.

```
/
├── components/          # Komponenty React wielokrotnego użytku
│   ├── ui/              # Ogólne komponenty UI (np. LoadingSpinner)
│   ├── icons/           # Komponenty ikon SVG
│   ├── Clock.tsx        # Komponent zegara cyfrowego
│   ├── DepartureBoard.tsx # Tablica dla pojedynczego przystanku
│   └── DepartureRow.tsx   # Wiersz dla pojedynczego odjazdu
├── services/            # Logika do pobierania danych z zewnętrznego API
│   └── transitService.ts
├── App.tsx              # Główny komponent aplikacji i layout
├── constants.ts         # Stałe aplikacji (ID przystanków, URL API)
├── index.html           # Główny plik HTML
├── index.tsx            # Punkt wejściowy aplikacji React
└── types.ts             # Definicje typów TypeScript
```

## ⚙️ Jak to działa?

Aplikacja opiera się na prostym przepływie danych:

1.  Główny komponent `App.tsx` zarządza procesem pobierania danych dla predefiniowanej listy przystanków, której identyfikatory znajdują się w pliku `constants.ts`.
2.  Moduł `services/transitService.ts` jest odpowiedzialny za wysyłanie zapytań do publicznego API ZTM Gdańsk w celu uzyskania informacji o najbliższych odjazdach.
3.  Po otrzymaniu odpowiedzi, stan aplikacji jest aktualizowany, co powoduje ponowne wyrenderowanie interfejsu użytkownika.
4.  Komponent `DepartureBoard` wyświetla informacje dla pojedynczego przystanku, sortując odjazdy według szacowanego czasu przybycia.
5.  Komponent `DepartureRow` renderuje szczegóły każdego odjazdu, oblicza czas pozostały do przyjazdu i stosuje specjalne style dla kursów opóźnionych.
6.  Cały proces pobierania danych jest powtarzany co 30 sekund, aby zapewnić aktualność wyświetlanych informacji.

## 🚀 Uruchomienie

Projekt jest skonfigurowany do działania w specyficznym środowisku deweloperskim. Aby uruchomić go lokalnie w standardowej konfiguracji, należy wykonać następujące kroki:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone <URL_repozytorium>
    ```
2.  **Przejdź do katalogu projektu:**
    ```bash
    cd gdansk-tram-departures
    ```
3.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```
4.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```
Aplikacja powinna być teraz dostępna na Twoim lokalnym serwerze.
