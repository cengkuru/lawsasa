<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatutechaptersectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statutechaptersections', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number');
            $table->longText('provision');
            $table->integer('statutchapter_id')->unsigned();
            $table->foreign('statutchapter_id')->references('id')->on('statutechapters');
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
        Schema::drop('statutechaptersections');
    }
}
