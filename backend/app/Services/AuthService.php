<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\ActivityLogRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    protected $activityLogRepository;

    public function __construct(ActivityLogRepositoryInterface $activityLogRepository)
    {
        $this->activityLogRepository = $activityLogRepository;
    }

    /**
     * Attempt to login user
     *
     * @param array $credentials
     * @return array|null
     */
    public function login(array $credentials): ?array
    {
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return null;
        }

        $user = Auth::guard('api')->user();

        if (!$user->is_active) {
            Auth::guard('api')->logout();
            return null;
        }

        $this->activityLogRepository->log(
            $user->id,
            'login',
            "Admin {$user->name} melakukan login pada " . now()->timezone('Asia/Jakarta')->format('d M Y H:i')
        );

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ];
    }

    /**
     * Logout user
     *
     * @return bool
     */
    public function logout(): bool
    {
        $user = Auth::guard('api')->user();

        if ($user) {
            $this->activityLogRepository->log(
                $user->id,
                'logout',
                "Admin {$user->name} melakukan logout pada " . now()->timezone('Asia/Jakarta')->format('d M Y H:i')
            );

            Auth::guard('api')->logout();
            return true;
        }

        return false;
    }

    /**
     * Get authenticated user
     *
     * @return User|null
     */
    public function me(): ?User
    {
        return Auth::guard('api')->user();
    }

    /**
     * Refresh token
     *
     * @return array
     */
    public function refresh(): array
    {
        $token = Auth::guard('api')->refresh();

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
        ];
    }
}