import {
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { RequestRegistrationOtpDto } from '../dto/request-registration-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { LogoutDto } from '../dto/logout.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration/otp')
  @ApiOperation({ summary: 'Demander un code OTP pour inscription' })
  requestRegistrationOtp(
    @Body() dto: RequestRegistrationOtpDto,
  ) {
    return this.authService.requestRegistrationOtp(dto.phone);
  }

  @Post('registration/verify')
  @ApiOperation({ summary: 'Vérifier le code OTP d’inscription' })
  verifyRegistrationOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyRegistrationOtp(
      dto.phone,
      dto.code,
    );
  }

  @Post('register')
  @ApiOperation({ summary: 'Créer un compte élève' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Se connecter' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renouveler les tokens' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

@Post('logout')
@ApiOperation({ summary: 'Révoquer une session' })
logout(@Body() dto: LogoutDto) {
  return this.authService.logout(
    dto.refreshToken,
    dto.deviceToken,
  );
}

  @Post('forgot-password')
  @ApiOperation({ summary: 'Demander un code de réinitialisation' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.phone);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Réinitialiser le mot de passe' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(
      dto.phone,
      dto.code,
      dto.newPassword,
    );
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier son mot de passe connecté' })
  changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, dto);
  }
}