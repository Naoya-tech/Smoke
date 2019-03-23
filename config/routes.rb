Rails.application.routes.draw do
  devise_for :users
  resources :areas
  post 'areas' => 'areas#create'
  get 'areas/marker',  to: 'areas#marker',  as: :marker
  root "areas#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
