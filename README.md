# GDGoC Belgrade — Git Onboarding 2

## Osnovne Git komande i timski workflow

**IT Team • Praktično uputstvo za nove članove**

**Cilj:** da svaki član razume osnovni Git workflow i može samostalno da radi na branch-u, napravi commit, sinhronizuje promene sa GitHub-om i učestvuje u Pull Request procesu.

## Kako čitati ovu skriptu

Komande u sivim okvirima iz originalnog dokumenta kucaju se u **Git Bash-u**. Koraci označeni kao **GitHub** rade se u internet pregledaču.

Primeri koriste branch `feature/navbar`, ali u stvarnom radu naziv branch-a prilagodite konkretnom task-u.

---

## 1. Osnovni Git workflow

U svakodnevnom radu ne koristimo Git komande nasumično. One čine jedan logičan tok rada:

```text
git clone → git switch -c branch → izmena koda → git status → git add → git commit → git push → Pull Request → merge
```

Kada se promene drugih članova spoje u `main`, lokalni projekat osvežavamo komandama `git fetch` ili `git pull`.

- **Lokalno:** kod i Git istorija na vašem računaru.
- **Remote:** udaljeni repository na GitHub-u.
- **Branch:** odvojena grana rada za funkcionalnost ili ispravku.
- **Commit:** sačuvana tačka u istoriji projekta.
- **Pull Request:** zahtev da se izmene sa jednog branch-a pregledaju i spoje u drugi.

---

## 2. Preuzimanje postojećeg projekta — `git clone`

**GDE RADIMO:** GitHub + Git Bash — URL kopirate sa GitHub-a, a komandu pokrećete u Git Bash-u.

1. Na GitHub-u otvorite repository.
2. Kliknite **Code**, izaberite **HTTPS** i kopirajte URL.
3. Otvorite Git Bash u folderu u kojem želite da projekat bude sačuvan.
4. Pokrenite `git clone` sa kopiranim URL-om.

```bash
git clone https://github.com/GDGoC-Belgrade/ime-repozitorijuma.git
```

Zatim uđite u projekat:

```bash
cd ime-repozitorijuma
```

`git clone` pravi lokalnu kopiju udaljenog repozitorijuma i automatski podešava vezu ka remote-u koji se standardno zove `origin`.

---

## 3. Provera stanja — `git status`

**GDE RADIMO:** Git Bash — dok ste pozicionirani unutar foldera projekta.

```bash
git status
```

Komanda prikazuje na kom ste branch-u, koje fajlove ste promenili, koji fajlovi nisu praćeni i koje izmene su spremne za commit.

> **PRAKTIČNO PRAVILO:** Ako niste sigurni šta se trenutno dešava sa repozitorijumom, prvo pokrenite `git status`.

---

## 4. Branch-evi

Branch omogućava da radite na svom task-u bez direktnog menjanja glavne grane `main`. U timskom radu za funkcionalnosti i ispravke koristimo odvojene branch-eve.

```text
main
├── feature/navbar
├── feature/login-page
└── fix/mobile-menu
```

### 4.1. Pregled branch-eva

```bash
git branch
```

Zvezdica (`*`) označava branch na kojem se trenutno nalazite.

### 4.2. Kreiranje novog branch-a

```bash
git switch -c feature/navbar
```

Ova komanda kreira branch `feature/navbar` i odmah vas prebacuje na njega.

### 4.3. Prebacivanje na postojeći branch

```bash
git switch main
git switch feature/navbar
```

> **NAPOMENA:** U timskom workflow-u ne radimo direktno na `main` branch-u. Za task pravimo poseban branch, osim ako team lead ne odredi drugačije.

---

## 5. Promene, staging i commit

Nakon što izmenite kod u editoru, Git vidi promenu, ali ona još nije deo novog commit-a.

### 5.1. Pregled izmene — `git diff`

```bash
git diff
```

Prikazuje razliku između trenutnih izmena i poslednje sačuvane verzije. Korisno je da pre commit-a proverite šta ste zaista promenili.

### 5.2. Dodavanje u staging — `git add`

Dodavanje konkretnog fajla u staging area:

```bash
git add README.md
```

Dodavanje svih trenutnih izmena iz radnog direktorijuma u staging:

```bash
git add .
```

Pre ove komande proverite `git status` i `git diff` da slučajno ne uključite neželjene fajlove.

```text
Izmena fajla → git add → Staging area → git commit
```

### 5.3. Čuvanje izmene — `git commit`

```bash
git commit -m "Add responsive navbar"
```

Commit predstavlja sačuvanu tačku u istoriji projekta. Jedan commit treba da predstavlja jednu logičnu celinu promena.

Dobri primeri commit poruka:

```bash
git commit -m "Add login form"
git commit -m "Fix navbar responsiveness"
git commit -m "Update README"
```

> **NAPOMENA:** Izbegavajte nejasne poruke kao što su `"changes"`, `"stuff"`, `"test"` ili `"fix"` kada poruka može jasno da opiše šta je promenjeno.

### 5.4. Pregled istorije — `git log`

```bash
git log
```

Prikazuje skraćeni ID commit-a i njegovu poruku. Na primer:

```text
91ac813 Add responsive navbar
430bd29 Initial commit
```

---

## 6. Push, fetch i pull

Ove komande povezuju lokalni repository sa udaljenim repository-jem na GitHub-u.

### 6.1. Slanje promena — `git push`

**GDE RADIMO:** Git Bash — nakon što ste napravili najmanje jedan commit na svom branch-u.

```bash
git push -u origin feature/navbar
```

Prvi put ovom komandom šaljemo branch `feature/navbar` na remote `origin` i uspostavljamo tracking vezu.

Nakon toga je za isti branch obično dovoljno:

```bash
git push
```

```text
Lokalni commit-i → git push → GitHub
```

Push šalje commit-e sa vašeg lokalnog branch-a na GitHub. Ne spaja ih automatski u `main`.

### 6.2. Provera novih remote promena — `git fetch`

```bash
git fetch
```

Fetch preuzima informacije i objekte sa remote repozitorijuma, ali ne menja automatski vaš trenutni branch ili radne fajlove. Koristan je kada želite prvo da proverite šta se promenilo na GitHub-u.

```text
GitHub → git fetch → lokalni Git podaci
                     trenutni fajlovi ostaju nepromenjeni
```

### 6.3. Preuzimanje i integracija promena — `git pull`

```bash
git pull
```

Pull preuzima nove promene sa remote branch-a i integriše ih u trenutni lokalni branch. U uobičajenoj konfiguraciji to znači `fetch + merge`; u nekim projektima Git može biti podešen da koristi rebase.

Kada želite najnoviji `main`:

```bash
git switch main
git pull
```

| Komanda | Smer | Šta radi |
|---|---|---|
| `git fetch` | GitHub → lokalno | Preuzima remote informacije/promene bez automatske izmene trenutnog branch-a. |
| `git pull` | GitHub → lokalno | Preuzima i integriše promene u trenutni branch. |
| `git push` | lokalno → GitHub | Šalje lokalne commit-e na remote branch. |

> **PRAKTIČNO PRAVILO:** Zapamtite: `fetch` = proveri/preuzmi remote novosti bez automatskog spajanja; `pull` = preuzmi i integriši; `push` = pošalji moje commit-e.

---

## 7. Merge

Merge spaja istoriju jednog branch-a u branch na kojem se trenutno nalazite.

Primer: želite lokalno da spojite `feature/navbar` u `main`:

```bash
git switch main
git merge feature/navbar
```

Važno je da razumete smer: `git merge feature/navbar` znači „uzmi izmene iz `feature/navbar` i spoji ih u branch na kojem sam sada“.

> **NAPOMENA:** U našem timskom radu feature branch se najčešće neće ručno spajati direktno u `main`. Standardni način je Pull Request na GitHub-u, code review, pa merge preko GitHub-a.

### 7.1. Merge conflict

Ako dve grane promene isti deo istog fajla na različit način, Git možda neće moći automatski da odluči šta treba da ostane. Tada nastaje merge conflict.

```text
<<<<<<< HEAD
Aleksa
=======
Petar
>>>>>>> feature/team
```

Potrebno je ručno urediti fajl tako da ostane željeni sadržaj i ukloniti oznake konflikta. Zatim:

```bash
git add README.md
git commit
```

Ako konflikt nastane tokom Pull Request-a, GitHub će pokazati da branch ne može da se merge-uje dok se konflikt ne reši.

---

## 8. Pull Request (PR)

**GDE RADIMO:** GitHub u browser-u — Pull Request nije Git komanda; to je funkcionalnost GitHub-a.

Pull Request je zahtev da se promene sa jednog branch-a pregledaju i, nakon odobrenja, spoje u drugi branch — najčešće u `main`.

Pre kreiranja PR-a vaš branch mora da bude push-ovan na GitHub:

```bash
git push -u origin feature/navbar
```

1. Na GitHub-u otvorite repository.
2. Otvorite **Pull requests**.
3. Kliknite **New pull request**.
4. Kao **base** izaberite `main`, a kao **compare** vaš feature branch.
5. Pregledajte listu promena i kliknite **Create pull request**.
6. Dodajte jasan naslov i kratak opis onoga što je urađeno.

```text
feature/navbar → Pull Request → Code Review → Approve → Merge → main
```

### 8.1. Šta se radi tokom code review-a?

- Reviewer pregleda izmene u fajlovima.
- Može ostaviti komentar ili pitanje.
- Može tražiti dodatne izmene (**Request changes**).
- Može odobriti PR (**Approve**).
- Nakon ispunjenih uslova PR se merge-uje u ciljni branch.

### 8.2. Ako reviewer traži izmene

Ne pravite novi Pull Request. Ostanite na istom branch-u, napravite tražene izmene, novi commit i push:

```bash
git add .
git commit -m "Update navbar breakpoint"
git push
```

GitHub automatski dodaje novi commit u postojeći Pull Request.

---

## 9. Privremeno čuvanje rada — `git stash`

Stash koristimo kada imamo nezavršene lokalne izmene koje još ne želimo da commit-ujemo, ali moramo privremeno da pređemo na drugi branch ili obavimo drugi zadatak.

Primer: radite na `feature/navbar`, a potrebno je da privremeno pređete na `main`.

```bash
git stash
```

Git privremeno sklanja nezavršene izmene. Zatim možete promeniti branch:

```bash
git switch main
```

Kada se vratite na svoj branch:

```bash
git switch feature/navbar
git stash pop
```

`git stash pop` vraća poslednji stash i uklanja ga sa stash liste ako je primena uspešna.

### 9.1. Pregled stash-eva

```bash
git stash list
```

Primer rezultata:

```text
stash@{0}: WIP on feature/navbar
stash@{1}: WIP on feature/login
```

> **NAPOMENA:** Stash nije zamena za commit. Koristi ga za kratkotrajno sklanjanje nezavršenog rada, a ne kao trajno mesto za čuvanje promena.

---

## 10. Nakon merge-a

Kada je Pull Request merge-ovan, vratite se na `main` i preuzmite najnovije promene:

```bash
git switch main
git pull
```

Ako vam lokalni feature branch više nije potreban, možete ga obrisati:

```bash
git branch -d feature/navbar
```

Opcija `-d` bezbedno briše lokalni branch ako Git proceni da su njegove promene već integrisane.

---

## 11. Kompletan workflow za jedan task

Ovo je redosled koji će član najčešće koristiti kada dobije novi task:

1. `git switch main`
2. `git pull`
3. `git switch -c feature/naziv-taska`
4. Rad na kodu
5. `git status`
6. `git diff`
7. `git add .`
8. `git commit -m "Jasna poruka"`
9. `git push -u origin feature/naziv-taska`
10. Kreirati Pull Request na GitHub-u
11. Odgovoriti na review i po potrebi uraditi nove commit-e + `git push`
12. Nakon merge-a: `git switch main && git pull`

> **PRAKTIČNO PRAVILO:** Pre početka novog branch-a uvek prvo osvežite `main`, osim ako je za konkretan projekat dogovoren drugačiji workflow.

---

## 12. Git cheat sheet

| Komanda | Značenje |
|---|---|
| `git clone URL` | Preuzima udaljeni repository na računar. |
| `git status` | Prikazuje trenutno stanje repozitorijuma. |
| `git diff` | Prikazuje nestage-ovane izmene. |
| `git add .` | Dodaje trenutne izmene u staging area. |
| `git commit -m "poruka"` | Kreira commit. |
| `git log --oneline` | Prikazuje sažetu istoriju commit-a. |
| `git branch` | Prikazuje lokalne branch-eve. |
| `git switch -c ime` | Kreira novi branch i prelazi na njega. |
| `git switch ime` | Prelazi na postojeći branch. |
| `git fetch` | Preuzima remote novosti bez automatskog spajanja u trenutni branch. |
| `git pull` | Preuzima i integriše remote promene. |
| `git push` | Šalje lokalne commit-e na remote branch. |
| `git merge branch` | Spaja navedeni branch u trenutni branch. |
| `git stash` | Privremeno sklanja nezavršene izmene. |
| `git stash list` | Prikazuje postojeće stash-eve. |
| `git stash pop` | Vraća poslednji stash. |
| `git branch -d ime` | Briše lokalni branch kada više nije potreban. |

> **NAPOMENA:** Za početak nije potrebno učiti napredne komande kao što su `rebase`, `cherry-pick` ili `reset --hard`. Fokus je da sigurno savladate standardni **branch → commit → push → Pull Request → merge** workflow.
