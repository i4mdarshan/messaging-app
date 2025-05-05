<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Chats;
use App\Models\Messages;
use App\Models\Groups;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Darshan',
            'email' => 'darshan@example.com',
            'password' => bcrypt("darshan3124"),
            'is_admin' => true
        ]);

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt("john1234"),
        ]);

        User::factory(10)->create();

        for ($i = 0; $i < 5; $i++) {
            $group = Groups::factory()->create([
                'owner_id' => 1,
            ]);

            $users = User::inRandomOrder()->limit(rand(2, 5))->pluck('id');
            $group->users()->attach(array_unique([1, ...$users]));
        }

        Messages::factory(1000)->create();
        $messages = Messages::whereNull('groups_id')->orderBy('created_at')->get();

        // last message id for groups is not getting populated
        $chats = $messages->groupBy(function ($message) {
            return collect([$message->sender_id, $message->receiver_id])
                ->sort()->implode('_');
        })->map(function ($groupedMessages) {
            return [
                'sender_id' => $groupedMessages->first()->sender_id,
                'receiver_id' => $groupedMessages->first()->receiver_id,
                'last_message_id' => $groupedMessages->last()->id,
                'created_at' => new Carbon(),
                'updated_at' => new Carbon(),
            ];
        })->values();

        // Chats::insertOrIgnore($chats->toArray());
        User::whereNull('public_uid')->each(function ($user) {
            $user->update(['public_uid' => Str::uuid()]);
        });

        Groups::whereNull('public_uid')->each(function ($group) {
            $group->update(['public_uid' => Str::uuid()]);
        });
    }
}
