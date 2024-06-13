import { FilterRepository } from "../src/components/threads/logic/filter-repository"

describe('FilterRepository', () => {
    let filterRepo: FilterRepository;

    beforeEach(() => {
        filterRepo = new FilterRepository();
    });

    afterEach(() => {
        filterRepo.reset();
    });

    describe('reset', () => {
        it('should reset account and labels', () => {
            filterRepo.account = 'testAccount';
            filterRepo.labels = ['label1', 'label2'];

            filterRepo.reset();

            expect(filterRepo.account).toBe('');
            expect(filterRepo.labels).toEqual([]);
        });
    });

    describe('hasActiveFilter', () => {
        it('should return false when account and labels are empty', () => {
            const isActive = filterRepo.hasActiveFilter();
            expect(isActive).toBe(false);
        });

        it('should return true when account is not empty', () => {
            filterRepo.account = 'testAccount';
            const isActive = filterRepo.hasActiveFilter();
            expect(isActive).toBe(true);
        });

        it('should return true when labels array is not empty', () => {
            filterRepo.labels = ['label1', 'label2'];
            const isActive = filterRepo.hasActiveFilter();
            expect(isActive).toBe(true);
        });

        it('should return true when both account and labels are not empty', () => {
            filterRepo.account = 'testAccount';
            filterRepo.labels = ['label1', 'label2'];
            const isActive = filterRepo.hasActiveFilter();
            expect(isActive).toBe(true);
        });
    });
});
