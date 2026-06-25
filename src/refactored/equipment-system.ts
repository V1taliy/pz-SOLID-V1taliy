import { IEquipment, IMovable, IFirepower, IStorage, INotifier } from '../interfaces';

// LSP & ISP дотримано: Класи реалізують лише те, що дійсно вміють
export class ArtillerySystem implements IEquipment, IFirepower {
    constructor(public name: string) {}

    repair(): void { console.log(`${this.name} barrel is being replaced.`); }
    fire(): void { console.log(`${this.name} is firing!`); }
    
    // OCP дотримано: Поліморфізм замість if/else
    performCheck(): string {
        return `Processing Artillery: ${this.name}. Checking barrels...`;
    }
}

export class TransportVehicle implements IEquipment, IMovable {
    constructor(public name: string) {}

    repair(): void { console.log(`${this.name} engine is being fixed.`); }
    drive(): void { console.log(`${this.name} is moving.`); }
    
    performCheck(): string {
        return `Processing Transport: ${this.name}. Checking fuel...`;
    }
}

// Інфраструктурні класи реалізують абстракції
export class SheetsStorage implements IStorage {
    save(data: string): void { console.log(`Saved to Sheets: ${data}`); }
}

export class SignalNotifier implements INotifier {
    notify(message: string): void { console.log(`Signal message sent: ${message}`); }
}

// SRP дотримано: Клас відповідає ТІЛЬКИ за формування та передачу звіту
// DIP дотримано: Клас залежить від абстракцій (IStorage, INotifier), а не від конкретики
export class DailyLogService {
    constructor(
        private storage: IStorage,
        private notifier: INotifier
    ) {}

    process(equipment: IEquipment): void {
        const checkResult = equipment.performCheck();
        console.log(checkResult);

        const report = `Report generated for: ${equipment.name}`;
        
        this.storage.save(report);
        this.notifier.notify(report);
    }
}