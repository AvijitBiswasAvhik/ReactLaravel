<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class input extends Component
{
    /**
     * Create a new component instance.
     */
    public $id, $type, $class, $name, $value, $autocomplete, $labelClass, $placeholder;
    public function __construct($id,$type,$class,$name,$autocomplete,$placeholder,$value)
    {
        //
        $this->id = $id;
        $this->type = $type;
        $this->class = $class;
        $this->name = $name;
        $this->autocomplete = $autocomplete;
        $this->placeholder = $placeholder;
        $this->value = $value;

    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.input');
    }
}
