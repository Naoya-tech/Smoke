class AreasController < ApplicationController
  def index 
    @areas = Area.all
    @areas_lat = []
    @areas_log = []
    @areas_address = []
    @areas.each do |area|
      @areas_lat.push(area.latitude)
      @areas_log.push(area.longitude)
      @areas_address.push(area.address)
    end
    @area = Area.new
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
    params.require(:area).permit(:address, :latitude, :longitude, :comment, :status)
  end
end
