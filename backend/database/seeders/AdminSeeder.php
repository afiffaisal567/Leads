<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin1@wafa.id'],
            [
                'name' => 'Admin1 WAFA',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Default admin user created successfully!');
        $this->command->info('Email: admin1@wafa.id');
        $this->command->info('Password: password123');
    }
}
