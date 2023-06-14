<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\House;

class HouseController extends Controller
{
    public function __invoke(Request $request)
    {
        $access_list = [
            'name'      => '',
            'bedrooms'  => 0,
            'bathrooms' => 0,
            'storeys'   => 0,
            'garages'   => 0,
            'min-price' => 0,
            'max-price' => 0
        ];

        $data = $request->all();

        if ($data) {
//            $data = json_decode($data);

            foreach ($data as $value) {
                if (array_key_exists($value['name'], $access_list)) {
                    $access_list[$value['name']] = $value['value'];
                }
            }
        }

        [
            'name'      => $name,
            'bedrooms'  => $bedrooms,
            'bathrooms' => $bathrooms,
            'storeys'   => $storeys,
            'garages'   => $garages,
            'min-price' => $min,
            'max-price' => $max
        ] = $access_list;

        $houses = House::select('name', 'price', 'bedrooms', 'bathrooms', 'storeys', 'garages')
                       ->when($min, function ($query, $min) {
                           return $query->where('price', '>=', $min);
                       })
                       ->when($name, function ($query, $name) {
                           return $query->where('name', 'like', "%{$name}%");
                       })
                       ->when($max, function ($query, $max) {
                           return $query->where('price', '<=', $max);
                       })
                       ->when($bedrooms, function ($query, $bedrooms) {
                           return $query->where('bedrooms', $bedrooms);
                       })
                       ->when($bathrooms, function ($query, $bathrooms) {
                           return $query->where('bathrooms', $bathrooms);
                       })
                       ->when($storeys, function ($query, $storeys) {
                           return $query->where('storeys', $storeys);
                       })
                       ->when($garages, function ($query, $garages) {
                           return $query->where('garages', $garages);
                       })
                       ->get();

        return response()->json($houses);
    }
}
