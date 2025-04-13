import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { getInfo } from '../../user-actions/user-info.action'; // Corrected path

// Mock the mock-db module
vi.mock('@/mock-db', () => ({
  userConfig: {
    findUnique: vi.fn(), // Mock the findUnique method
  },
}));

// Mock unstable_cache to just call the underlying function directly in tests
// This bypasses caching logic for unit testing the core function behavior
vi.mock('next/cache', async (importOriginal) => {
  const original = await importOriginal() as Record<string, unknown>;
  return {
    ...original,
    unstable_cache: (fn: (...args: unknown[]) => Promise<unknown> | unknown) => fn,
  };
});

describe('getInfo Action', () => {
  const mockUserId = 'test-user-123';
  let mockFindUnique: Mock;

  beforeEach(async () => {
    // Reset mocks and get reference
    vi.clearAllMocks();
    const db = await import('@/mock-db');
    mockFindUnique = db.userConfig.findUnique as Mock;

    // Mock process.env USER_ID
    vi.stubEnv('USER_ID', mockUserId);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return undefined if USER_ID is not set', async () => {
    vi.unstubAllEnvs(); // Remove USER_ID for this test

    const result = await getInfo();

    expect(result).toBeUndefined();
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it('should call userConfig.findUnique with USER_ID and select args', async () => {
    const mockSelect = { name: true, email: true };
    const mockUserData = { id: mockUserId, name: 'Test User', email: 'test@example.com' };
    mockFindUnique.mockResolvedValue(mockUserData);

    const result = await getInfo(mockSelect);

    expect(mockFindUnique).toHaveBeenCalledTimes(1);
    expect(mockFindUnique).toHaveBeenCalledWith(mockUserId, mockSelect);
    expect(result).toEqual(mockUserData);
  });

  it('should call userConfig.findUnique with USER_ID and undefined select if not provided', async () => {
    const mockUserData = { id: mockUserId, name: 'Test User', email: 'test@example.com', bio: 'Test bio' };
    mockFindUnique.mockResolvedValue(mockUserData);

    const result = await getInfo(); // No select arg

    expect(mockFindUnique).toHaveBeenCalledTimes(1);
    expect(mockFindUnique).toHaveBeenCalledWith(mockUserId, undefined);
    expect(result).toEqual(mockUserData);
  });

  it('should return undefined if userConfig.findUnique throws an error', async () => {
    const dbError = new Error('Database lookup failed');
    mockFindUnique.mockRejectedValue(dbError);

    const result = await getInfo();

    expect(mockFindUnique).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
    // Optionally check console.error was called if important
    // const errorSpy = vi.spyOn(console, 'error');
    // expect(errorSpy).toHaveBeenCalledWith(dbError);
  });
}); 