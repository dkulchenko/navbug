defmodule Navbug.Repo do
  use Ecto.Repo,
    otp_app: :navbug,
    adapter: Ecto.Adapters.Postgres
end
