class AreasController < ApplicationController
  def index 
    @areas = Area.where(logged_in: false)
    @areas_lat = []
    @areas_log = []
    @areas_address = []
    @areas.each do |area|
      @areas_lat.push(area.latitude)
      @areas_log.push(area.longitude)
      @areas_address.push(area.address)
    end
    # @login_areas = Area.where(logg_in: true)
    # @login_areas_lat = []
    # @login_areas_log = []
    # @login_areas_address = []
    # @login_areas.each do |area|
    #   @login_areas_lat.push(area.latitude)
    #   @login_areas_log.push(area.longitude)
    #   @login_areas_address.push(area.address)
    # end
    @area = Area.new
  end

  def new
  end

  def create
    @area = Area.new(area_params)
    # if current_user
    #   @area.logged_in = true
    # end
    @area.save
    redirect_to "/"
  end

  private

  def area_params # ストロングパラメータを定義する
    params.require(:area).permit(:address, :latitude, :longitude, :comment, :status)
  end
end