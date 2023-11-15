import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export declare class TempSessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
