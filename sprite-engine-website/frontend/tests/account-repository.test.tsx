import { AccountRepository } from  "../src/components/threads/logic/account-repository"
import { Account } from "../src/components/threads/logic/model"
import { bFetch } from "../src/utils/general"

jest.mock('../src/utils/general', () => ({
    bFetch: jest.fn(),
}));

describe('AccountRepository', () => {
    let accountRepo: AccountRepository;

    beforeEach(() => {
        accountRepo = new AccountRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addAccount', () => {
        it('should call bFetch with the correct parameters', async () => {
            const account = new Account('testUser', 'test@example.com', 'password123', 'picture.jpg');
            const response = new Response(null, { status: 201 });
            (bFetch as jest.Mock).mockResolvedValue(response);

            const result = await accountRepo.addAccount(account);
            
            expect(result).toBe(response);
        });
    });

    describe('getAccountByName', () => {
        it('should return an account with the correct parameters', async () => {
            const name = 'testUser';
            const expectedAccount = new Account(name, '123', `http://localhost:5000/avatars/${name}.webp`, '123');

            const account = await accountRepo.getAccountByName(name);

            expect(account).toEqual(expectedAccount);
        });
    });
});
