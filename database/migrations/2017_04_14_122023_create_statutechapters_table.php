<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatutechaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statutechapters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');
            $table->integer('statute_id')->unsigned();
            $table->foreign('statute_id')->references('id')->on('statutes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('statutechapters');
    }
}
