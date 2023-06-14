<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->fulltext('houses_name');
            $table->decimal('price', 10, 3)->unsigned()->index('price');
            $table->integer('bedrooms')->unsigned()->index('bedrooms')->nullable();
            $table->integer('bathrooms')->unsigned()->index('bathrooms')->nullable();
            $table->integer('storeys')->unsigned()->index('storeys')->nullable();
            $table->integer('garages')->unsigned()->index('garages')->nullable();
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
        Schema::dropIfExists('houses');
    }
}
