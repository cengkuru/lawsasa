<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LawareasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('lawareas')->delete();
        $lawareas = [
            [
                'id'=>'1',
                'title' => 'Intellectual property',
                'description' => 'some content'
            ]
        ];

        foreach ($lawareas as $lawarea) {
            \App\Lawarea::create($lawarea);
        }
        Model::reguard();
    }
}
