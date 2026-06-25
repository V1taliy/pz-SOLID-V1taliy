// ISP: Розділяємо великий інтерфейс на менші, специфічні
export interface IEquipment {
    name: string;
    repair(): void;
    performCheck(): string; // Для OCP: кожен тип сам знає, як себе перевіряти
}

export interface IMovable {
    drive(): void;
}

export interface IFirepower {
    fire(): void;
}

// DIP: Залежності для інфраструктури
export interface IStorage {
    save(data: string): void;
}

export interface INotifier {
    notify(message: string): void;
}