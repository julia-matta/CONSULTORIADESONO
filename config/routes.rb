Rails.application.routes.draw do
  root "pages#home"

  get "/sobre", to: "pages#sobre"
  get "/planos", to: "pages#planos"
  get "/depoimentos", to: "pages#depoimentos"
  get "/contato", to: "pages#contato"
end
