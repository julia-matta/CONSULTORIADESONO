module ApplicationHelper
  def nav_active_class(path)
    current_page?(path) ? "is-active" : ""
  end
end
