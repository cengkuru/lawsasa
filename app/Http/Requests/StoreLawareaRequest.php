<?php
namespace App\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Request;
class StoreLawareaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title'              => 'required|unique:lawareas,title',
            'description'=>'required'
        ];
        //when editing
        if(Request::isMethod('put')){
            $rules = [
                'title'=>'required',
                'description'=>'required'
            ];
        }

        return $rules;

    }
}