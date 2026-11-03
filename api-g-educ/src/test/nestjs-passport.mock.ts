export function AuthGuard() {
  return class {
    canActivate(): boolean {
      return true;
    }
  };
}
