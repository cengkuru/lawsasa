<?php
use App\User;
use App\Role;
use App\Userprofile;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('users')->delete();
        $users = [
          [
              'name' => 'Ojijo Pascal',
              'email' => 'admin@lawsasa.com',
              'password' => bcrypt('12345678')
          ]
        ];

        foreach ($users as $user) {
            $newUser = User::create($user);
            $newUser->roles()->attach(Role::where('name','registered')->first());
            $newUser->roles()->attach(Role::where('name','admin')->first());

            // Create profile
            $profile = new Userprofile([
                'imageurl' => 'assets/img/user.png'
            ]);
            User::find($newUser->id)->userprofile($profile);
        }
        Model::reguard();


    }
}
