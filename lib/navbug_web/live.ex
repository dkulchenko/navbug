defmodule NavbugWeb.Live do
  use NavbugWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <div phx-hook="Editor" id="editor"></div>
    """
  end
end
