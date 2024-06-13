import { ThreadRepository } from '../src/components/threads/logic/thread-repository';
import { Question } from '../src/components/threads/logic/model';
import { Account } from '../src/components/threads/logic/model';
import { ImageData } from '../src/components/threads/logic/model';
import { bFetch } from '../src/utils/general';
import { Log } from '../src/utils/general';
import { AccountRepository } from '../src/components/threads/logic/account-repository';

jest.mock('../src/components/threads/logic/account-repository', () => ({
    accountRepo: {
      getAccountByName: jest.fn().mockResolvedValue({ /* mocked account */ })
    }
  }));
  
  jest.mock('../src/utils/general', () => ({
    Log: {
      log: jest.fn()
    }
  }));
  
  jest.mock('../src/utils/general', () => ({
    bFetch: jest.fn().mockResolvedValue([])
}));


  
describe('ThreadRepository', () => {
    let repo: ThreadRepository;
  
    beforeEach(() => {
      repo = new ThreadRepository();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('constructor initializes correctly', () => {
      expect(repo).toBeDefined();
      expect(repo['m_count']).toBe(0);
      expect(repo['m_questions']).toEqual([]);
      expect(repo['m_thread_url']).toContain('/api/questions');
      expect(repo['m_inited']).toBeFalsy();
      expect(repo['m_reading']).toBeFalsy();
    });
  
    test('getHighestCount sets correct count', () => {
      repo['m_questions'] = [
        { getId: () => 1 },
        { getId: () => 3 },
        { getId: () => 2 }
      ] as any;
  
      repo.getHighestCount();
      expect(repo['m_count']).toBe(4); // Because max id is 3, so m_count should be 4 (max id + 1)
    }); 
  
    test('getQuestion returns correct question by title', () => {
      const question: Question = new Question(null!, "123", "123", 0, []);
      repo['m_questions'] = [question];
  
      const result = repo.getQuestion(question.title);
      expect(result).toBe(question);
    });
  
    // Add more tests for other synchronous methods as needed
  });
  