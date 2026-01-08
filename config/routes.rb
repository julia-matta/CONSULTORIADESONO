Rails.application.routes.draw do
  root "pages#home"
  get "/sobre", to: "pages#sobre"
end
