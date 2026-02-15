<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lead;
use Faker\Factory as Faker;

class LeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        for ($i = 0; $i < 50; $i++) {
            Lead::create([
                'nama' => $faker->name,
                'nomor_whatsapp' => '08' . $faker->numerify('##########'),
                'email' => $faker->unique()->safeEmail,
                'nama_lembaga' => $faker->company,
            ]);
        }

        $this->command->info('50 dummy leads created successfully!');
    }
}