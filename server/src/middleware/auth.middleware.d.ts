import type { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    adminId?: string;
}
export declare const authenticateAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map