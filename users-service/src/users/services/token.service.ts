import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) { }

    sign(payload: any): any {
        return this.jwtService.sign(payload);
    }

    verify(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new BadRequestException('token is not valid');
        }
    }
}