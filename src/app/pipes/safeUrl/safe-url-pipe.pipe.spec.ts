import { SafeUrlPipePipe } from './safe-url-pipe.pipe';

describe('SafeUrlPipePipe', () => {
  it('create an instance', () => {
    const pipe = new SafeUrlPipePipe(null as any); // Pass a dummy sanitizer for now
    expect(pipe).toBeTruthy();
  });
});
