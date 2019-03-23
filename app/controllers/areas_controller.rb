class AreasController < ApplicationController
  def index 
    @areas = Area.all
    @areas_lat = []
    @areas_log = []
    @areas.each do |area|
      @areas_lat.push(area.latitude)
      @areas_log.push(area.longitude)
    end
    @area = Area.new
  end
  def marker
    # 北から南、東から西の範囲をつくる
    lat = Range.new(*[params["north"], params["south"]].sort)
    lon = Range.new(*[params["east"], params["west"]].sort)
    # データ取得
    @locations = Area.where(latitude: lat, longitude: lon)
  end
  def new

  end

  def create
    @area = Area.new(area_params)
    @area.save
    redirect_to "/"
  end

  private

  def area_params # ストロングパラメータを定義する
    params.require(:area).permit(:address, :latitude, :longitude, :comment)
  end
end
