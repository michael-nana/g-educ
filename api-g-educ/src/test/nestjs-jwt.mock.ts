export class JwtService {
  signAsync(): Promise<string> {
    return Promise.resolve('test-token');
  }
}
