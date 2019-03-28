Rails.application.routes.draw do
  post 'areas' => 'areas#create'
  get 'areas/marker',  to: 'areas#marker',  as: :marker
  post 'areas/search' => 'areas#search'
  get 'areas/search' =>  redirect('/areas')
  root "areas#index"
  devise_for :users
  resources :areas
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
