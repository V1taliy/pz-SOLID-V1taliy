# Практична реалізація SOLID принципів

## Опис проекту
Цей проект демонструє рефакторинг системи обліку щоденних звітів стану техніки (`DailyLogManager`) згідно з п'ятьма принципами SOLID. 

## Аналіз порушень у вихідному коді (`src/original`)

1. **SRP (Single Responsibility Principle):**
   Клас `DailyLogManager` виконував одразу три задачі: обробляв логіку перевірки техніки, зберігав дані в БД та відправляв SMS. Якщо зміниться спосіб сповіщення, доведеться змінювати логіку класу звітів.
2. **OCP (Open/Closed Principle):**
   У методі `processEquipment` використовувався `if/else` для перевірки `type === 'Artillery'`. При додаванні нового типу (наприклад, БПЛА) довелось би змінювати існуючий код.
3. **LSP (Liskov Substitution Principle):**
   Транспортні засоби змушені були наслідувати базовий клас `Equipment`, який мав метод `fire()`. Транспорт не може стріляти, що порушує логіку заміщення.
4. **ISP (Interface Segregation Principle):**
   Інтерфейс `IEquipmentOperation` був занадто "товстим" і містив одночасно `drive()` та `fire()`. 
5. **DIP (Dependency Inversion Principle):**
   `DailyLogManager` безпосередньо створював інстанси `new GoogleSheetsDatabase()` та `new SmsNotifier()`. Високорівневий модуль залежав від низькорівневих деталей.

## Результат рефакторингу (`src/refactored`)

* **SRP:** Створено окремі класи для зберігання (`SheetsStorage`) та нотифікацій (`SignalNotifier`). `DailyLogService` відповідає лише за координацію процесу.
* **OCP:** Замість `if/else` використано поліморфізм. Кожен клас техніки сам реалізує метод `performCheck()`. Додавання нового типу техніки не вимагає змін у `DailyLogService`.
* **LSP:** Класи `ArtillerySystem` та `TransportVehicle` реалізують лише ті інтерфейси, які мають сенс для їхньої природи.
* **ISP:** Великий інтерфейс розділено на `IEquipment`, `IMovable` (для транспорту) та `IFirepower` (для артилерії).
* **DIP:** `DailyLogService` приймає залежності через конструктор (Dependency Injection) у вигляді абстракцій `IStorage` та `INotifier`.

## Запуск тестів
```bash
npm install
npm test