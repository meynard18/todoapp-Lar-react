<?php

namespace App\Http\Controllers\API;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index () {
        $task = Task::all();
        return response()->json(['status'=>200, "task"=>$task]);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(),[
            "task"=>"required", 
            "date"=>"required", 
         
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $task = New Task();
            $task->task=$request->input('task');
            $task->date=$request->input('date');
            $task->save(); //query builder orm
            return response()->json(['status'=>200, 'message'=>'task addded succesfully']);
        }
    }
    public function edit ($id) {
        $task = Task::find($id);
        if ($task) {
            return response()->json(['status'=>200, "task"=>$task]);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No task id found']);
        }
    }

    public function update (Request $request, $id ) {
        $validator = Validator::make($request->all(),[
            "task"=>"required", 
            "date"=>"required", 

        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validationError"=>$validator->errors()]);
        }
        else {
            $task = Task:: find($id); //same to SELECT * FROM table Where id is
            if ($task) {
                $task->task = $request->input('task');
                $task->date = $request->input('date');

                $task->update();
                return response()->json(['status'=>200,  'message'=>'task updated succesfully']);
            }
            else {
                return response()->json(['status'=>404, 'message'=>'No product id found']);
            }
        }
    }

    public function delete ($id) {
        $task = Task::find($id);
        if ($task) {
            $task-> delete();
            return response()->json(['status'=>200,'message'=>'task deleted']);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No task id found']);
        }
    }
}
