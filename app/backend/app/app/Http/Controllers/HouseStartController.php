<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HouseStartController extends Controller
{
    public function __invoke()
    {
        return response("API HOUSES");
    }
}
