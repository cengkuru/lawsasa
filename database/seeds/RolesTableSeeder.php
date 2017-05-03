<?php


use App\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;



class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('roles')->delete();
        // Fields
        $name ='name';
        $displayName = 'display_name';
        $description ='description';
        $system='system';
        $roles = [
            [$name => 'super-admin',$displayName => 'Super Admin',$description => 'Somebody with access to the site network administration features and all other features',$system=>'Y'],
            [$name => 'admin',$displayName => 'Admin',$description => 'The key difference with administrators is they have the ability to manage other users. Administrators can create new user accounts, reset passwords and block access',$system=>'Y'],
            [$name => 'guest',$displayName => 'Guest',$description => 'This is for users who aren\'t signed into the site.',$system=>'Y'],
            [$name => 'registered',$displayName => 'Registered',$description => 'This is the default login group. Registered users usually have access to hidden areas of your site like members content, downloads or the like.',$system=>'Y'],

        ];
        // Loop through fruits above and create the record in DB
        foreach ($roles as $role) {
            Role::create($role);
        }
        Model::reguard();

    }
}
