<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        DB::table('countries')->delete();
        // Fields


        $name = 'title';
        $countries = [
            [$name => 'UGANDA']
        ];
        // Loop through fruits above and create the record in DB
        foreach ($countries as $country) {
            \App\Country::create($country);
        }
        Model::reguard();
    }
}
