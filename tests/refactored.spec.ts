import { DailyLogService, ArtillerySystem, TransportVehicle } from '../src/refactored/equipment-system';
import { IStorage, INotifier } from '../src/interfaces';

describe('SOLID DailyLogService', () => {
    let mockStorage: IStorage;
    let mockNotifier: INotifier;
    let logService: DailyLogService;

    beforeEach(() => {
        // Створюємо моки для DIP
        mockStorage = { save: jest.fn() };
        mockNotifier = { notify: jest.fn() };
        logService = new DailyLogService(mockStorage, mockNotifier);
    });

    it('should process ArtillerySystem without errors (LSP/OCP check)', () => {
        const artillery = new ArtillerySystem('M777');
        logService.process(artillery);

        expect(mockStorage.save).toHaveBeenCalledWith('Report generated for: M777');
        expect(mockNotifier.notify).toHaveBeenCalledWith('Report generated for: M777');
    });

    it('should process TransportVehicle without errors (LSP/OCP check)', () => {
        const truck = new TransportVehicle('KRAZ');
        logService.process(truck);

        expect(mockStorage.save).toHaveBeenCalledWith('Report generated for: KRAZ');
        expect(mockNotifier.notify).toHaveBeenCalledWith('Report generated for: KRAZ');
    });

    it('should allow artillery to fire and transport to drive (ISP check)', () => {
        const artillery = new ArtillerySystem('M777');
        const truck = new TransportVehicle('KRAZ');

        // Перевіряємо, що специфічні методи існують лише там, де треба
        expect(typeof artillery.fire).toBe('function');
        expect((artillery as any).drive).toBeUndefined();

        expect(typeof truck.drive).toBe('function');
        expect((truck as any).fire).toBeUndefined();
    });
});