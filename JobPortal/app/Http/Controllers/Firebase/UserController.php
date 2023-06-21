<?php

namespace App\Http\Controllers\firebase;

use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Contract\Database;
use App\Http\Controllers\Controller;
use App\Http\Resources\firebase\userResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->tableName = "users";
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->database->getReference($this->tableName)->getValue();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $postData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => $request->role,
            'title' => $request->title,


        ];
        $postRef = $this->database->getReference($this->tableName)->push($postData);

       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $key = $id; 
        $editData = $this->database->getReference($this->tableName)->getChild($key)->getValue();
        return $editData;
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $key = $id;
        $updateData = [
            'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'role' => $request->role,
                    'title' => $request->tilte,
        ];
        $updatRef = $this->database->getReference($this->tableName.'/'.$key)->update($updateData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $key = $id; 
        $deleteData = $this->database->getReference($this->tableName)->getChild($key)->remove();
    }
}
