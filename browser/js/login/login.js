app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function($scope, $mdToast, $state, AuthService, Auth) {

    $scope.googleLogin = AuthService.login;

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.firebaseUser = null;
        $scope.error = null;
        Auth.$signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
            .then(function(authData) {
                console.log('Logged in as:', authData.uid);
                var last = {
                    bottom: false,
                    top: true,
                    left: false,
                    right: true
                };

                $scope.toastPosition = angular.extend({}, last);

                $scope.getToastPosition = function() {
                    sanitizePosition();

                    return Object.keys($scope.toastPosition)
                        .filter(function(pos) {
                            return $scope.toastPosition[pos];
                        })
                        .join(' ');
                };

                function sanitizePosition() {
                    var current = $scope.toastPosition;

                    if (current.bottom && last.top) current.top = false;
                    if (current.top && last.bottom) current.bottom = false;
                    if (current.right && last.left) current.left = false;
                    if (current.left && last.right) current.right = false;

                    last = angular.extend({}, current);
                }

                var pinTo = $scope.getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Login successful.')
                    .position(pinTo)
                    .hideDelay(3000)
                );
                $state.go('dashboard.week');
            }).catch(function(err) {
                console.log('Authentication failed:', err);
                var last = {
                    bottom: false,
                    top: true,
                    left: false,
                    right: true
                };

                $scope.toastPosition = angular.extend({}, last);

                $scope.getToastPosition = function() {
                    sanitizePosition();

                    return Object.keys($scope.toastPosition)
                        .filter(function(pos) {
                            return $scope.toastPosition[pos];
                        })
                        .join(' ');
                };

                function sanitizePosition() {
                    var current = $scope.toastPosition;

                    if (current.bottom && last.top) current.top = false;
                    if (current.top && last.bottom) current.bottom = false;
                    if (current.right && last.left) current.left = false;
                    if (current.left && last.right) current.right = false;

                    last = angular.extend({}, current);
                }

                var pinTo = $scope.getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Username or password incorrect. Please try again')
                    .position(pinTo)
                    .hideDelay(3000)
                );
            });
    };

});
