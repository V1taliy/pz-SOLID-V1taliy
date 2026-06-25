// АНТИ-SOLID КОД

export class GoogleSheetsDatabase {
    save(data: string): void {
        console.log(`Saving to Google Sheets: ${data}`);
    }
}

export class SmsNotifier {
    sendSms(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}

// ISP Порушення: Занадто великий інтерфейс
export interface IEquipmentOperation {
    drive(): void;
    fire(): void; // Транспорт не стріляє!
    repair(): void;
}

export class Equipment implements IEquipmentOperation {
    constructor(public name: string, public type: string) {}

    drive(): void {
        console.log(`${this.name} is moving.`);
    }

    // LSP Порушення: Базовий клас змушує реалізовувати методи, які не всім підходять
    fire(): void {
        console.log(`${this.name} is firing!`);
    }

    repair(): void {
        console.log(`${this.name} is being repaired.`);
    }
}

// SRP Порушення: Клас робить звіт, зберігає його і відправляє нотифікації
// DIP Порушення: Пряма залежність від конкретних класів GoogleSheetsDatabase та SmsNotifier
export class DailyLogManager {
    private db = new GoogleSheetsDatabase();
    private notifier = new SmsNotifier();

    processEquipment(equipment: Equipment): void {
        // OCP Порушення: При додаванні нового типу (наприклад, Дрон) доведеться змінювати цей метод
        if (equipment.type === 'Artillery') {
            console.log(`Processing Artillery: ${equipment.name}. Checking barrels...`);
            equipment.fire();
        } else if (equipment.type === 'Transport') {
            console.log(`Processing Transport: ${equipment.name}. Checking fuel...`);
            equipment.drive();
            // Транспорт не може стріляти, але метод є
        }

        const report = `Report: ${equipment.name} processed.`;
        
        this.db.save(report);
        this.notifier.sendSms(report);
    }
}