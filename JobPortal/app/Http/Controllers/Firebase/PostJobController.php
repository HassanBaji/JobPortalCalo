<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;
use App\Http\Resources\firebase\userResource;
use App\Http\Resources\firebaseServicesResource;
use App\Http\Resources\ServicesResource;

class PostJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->tableName = "posts";
    }

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
            'title' => $request->title,
            'desc' => $request->desc,


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
            'title' => $request->title,
            'desc' => $request->desc,
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
