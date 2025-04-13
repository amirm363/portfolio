import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { contactUser } from '../../user-actions/contact-user.action'; // Corrected path again

// Type for the state the action expects and returns
type ActionState = Awaited<ReturnType<typeof contactUser>>;

// Hold original fetch
const originalFetch = global.fetch;

describe('contactUser Action', () => {
  const mockApiKey = 'test-api-key';
  const mockBaseId = 'test-base-id';
  const mockTableId = 'test-table-id';
  const expectedUrl = `https://api.airtable.com/v0/${mockBaseId}/${mockTableId}`;

  beforeEach(() => {
    // Mock process.env
    vi.stubEnv('AIRTABLE_API_KEY', mockApiKey);
    vi.stubEnv('AIRTABLE_BASE_ID', mockBaseId);
    vi.stubEnv('AIRTABLE_TABLE_ID', mockTableId);

    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore fetch and env variables
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  const createFormData = (data: Record<string, string>): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const initialPrevState: ActionState = { success: false, message: '' };

  it('should return validation errors if form data is invalid', async () => {
    const invalidData = { name: '', email: 'invalid-email', message: '' };
    const formData = createFormData(invalidData);

    const result = await contactUser(initialPrevState, formData);
    console.log("🚀 ~ contact-user.action.test.ts:48 ~ it ~ result:", result);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Validation failed');
    expect(result.errors).toBeDefined();
    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.message).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should call fetch with correct data and return success if valid and API call succeeds', async () => {
    const validData = { name: 'Test User', email: 'test@example.com', message: 'Hello there' };
    const formData = createFormData(validData);

    // Mock successful fetch response
    (fetch as Mock).mockResolvedValue({ ok: true });

    const result = await contactUser(initialPrevState, formData);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockApiKey}`,
      },
      body: JSON.stringify({ fields: validData }),
    });
    expect(result.success).toBe(true);
    expect(result.message).toContain('Message sent successfully');
    expect(result.errors).toBeUndefined();
  });

  it('should return error if API call is not ok', async () => {
    const validData = { name: 'Test User', email: 'test@example.com', message: 'Hello there' };
    const formData = createFormData(validData);

    // Mock failed fetch response (status code !2xx)
    (fetch as Mock).mockResolvedValue({ ok: false });

    const result = await contactUser(initialPrevState, formData);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.message).toContain('unexpected error occurred'); // Check for the generic server error
    expect(result.errors).toBeUndefined();
  });

  it('should return error if fetch throws an error', async () => {
    const validData = { name: 'Test User', email: 'test@example.com', message: 'Hello there' };
    const formData = createFormData(validData);

    // Mock fetch to throw an error
    const networkError = new Error('Network failure');
    (fetch as Mock).mockRejectedValue(networkError);

    const result = await contactUser(initialPrevState, formData);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
    expect(result.message).toContain('unexpected error occurred');
    expect(result.errors).toBeUndefined();
  });
}); 